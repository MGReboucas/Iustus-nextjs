from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django.test import SimpleTestCase, TestCase


class HealthTests(SimpleTestCase):
    def test_health_is_public_minimal_and_not_cached(self):
        response = self.client.get("/api/v1/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
        self.assertIn("no-store", response["Cache-Control"])

    def test_health_does_not_accept_mutations(self):
        response = self.client.post("/api/v1/health/", data={})
        self.assertEqual(response.status_code, 405)

    def test_unimplemented_login_and_admin_are_not_published(self):
        for route in ("/admin/", "/api-auth/login/"):
            with self.subTest(route=route):
                self.assertEqual(self.client.get(route).status_code, 404)

    def test_untrusted_host_is_rejected(self):
        response = self.client.get("/api/v1/health/", HTTP_HOST="untrusted.invalid")
        self.assertEqual(response.status_code, 400)


class IdentityFoundationTests(TestCase):
    def test_email_normalization_and_password_hashing(self):
        user = get_user_model().objects.create_user(
            "  CLIENTE@EXAMPLE.COM  ", "synthetic-test-password"
        )
        user.refresh_from_db()
        self.assertEqual(user.email, "cliente@example.com")
        self.assertTrue(user.check_password("synthetic-test-password"))
        self.assertNotEqual(user.password, "synthetic-test-password")
        self.assertIsNone(user.email_verified_at)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_case_insensitive_uniqueness_also_applies_to_bulk_writes(self):
        users = get_user_model()
        users.objects.create_user("cliente@example.com")
        with self.assertRaises(IntegrityError), transaction.atomic():
            users.objects.bulk_create([users(email="CLIENTE@EXAMPLE.COM")])
