from concurrent.futures import ThreadPoolExecutor
from threading import Barrier
from unittest import skipUnless

from django.db import connection, connections
from django.test import TransactionTestCase

from apps.cases.models import Case, CaseEvent
from . import test_identity as identity


@skipUnless(connection.vendor == "postgresql", "Exige locks reais de PostgreSQL")
class CaseConcurrencyTests(TransactionTestCase):
    browser = identity.IdentityTests.browser
    post = identity.IdentityTests.post
    user = identity.IdentityTests.user
    login = identity.IdentityTests.login

    def test_two_edits_of_same_version_have_one_winner_and_one_event(self):
        user = self.user()
        item = Case.objects.create(owner=user, title="Antes")
        browsers = [self.browser(), self.browser()]
        for browser in browsers:
            self.login(browser, user)
        tokens = [browser.get("/api/v1/auth/csrf").json()["csrfToken"] for browser in browsers]
        barrier = Barrier(2)

        def change(index):
            try:
                barrier.wait(timeout=10)
                response = browsers[index].patch(f"/api/v1/cases/{item.pk}", {"version": 1, "title": f"Edição {index}"}, content_type="application/json", HTTP_X_CSRFTOKEN=tokens[index])
                return response.status_code
            finally:
                connections.close_all()

        with ThreadPoolExecutor(max_workers=2) as pool:
            statuses = sorted(pool.map(change, (0, 1)))
        self.assertEqual(statuses, [200, 409])
        item.refresh_from_db()
        self.assertEqual(item.version, 2)
        self.assertEqual(CaseEvent.objects.filter(case=item).count(), 1)
