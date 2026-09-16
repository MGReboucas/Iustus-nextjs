import time
from concurrent.futures import ThreadPoolExecutor
from threading import Barrier
from unittest import skipUnless

import pyotp
from django.conf import settings
from django.db import close_old_connections, connection
from django.test import Client, TransactionTestCase
from django.utils import timezone

from apps.identity.models import MFADevice, User
from apps.identity.security import encrypt


@skipUnless(connection.vendor == "postgresql", "Locks reais requerem PostgreSQL.")
class MFAConcurrencyTests(TransactionTestCase):
    def test_only_one_session_can_consume_the_same_totp(self):
        user = User.objects.create_user("race@example.test", "Concurrent-Password-991!", role="LAWYER", email_verified_at=timezone.now())
        secret = pyotp.random_base32()
        MFADevice.objects.create(user=user, encrypted_secret=encrypt(secret), confirmed_at=timezone.now())
        browsers = []
        for _ in range(2):
            browser = Client(enforce_csrf_checks=True, HTTP_HOST="127.0.0.1:3000", HTTP_X_IUSTUS_PROXY_KEY=settings.IUSTUS_PROXY_SECRET)
            csrf = browser.get("/api/v1/auth/csrf").json()["csrfToken"]
            result = browser.post("/api/v1/auth/login", {"email": user.email, "password": "Concurrent-Password-991!"}, content_type="application/json", HTTP_X_CSRFTOKEN=csrf)
            self.assertEqual(result.status_code, 202)
            browsers.append((browser, browser.get("/api/v1/auth/csrf").json()["csrfToken"]))
        barrier = Barrier(2)
        code = pyotp.TOTP(secret).at(int(time.time()))

        def attempt(item):
            close_old_connections()
            try:
                browser, csrf = item
                barrier.wait(timeout=5)
                return browser.post("/api/v1/auth/mfa/verify", {"code": code}, content_type="application/json", HTTP_X_CSRFTOKEN=csrf).status_code
            finally:
                close_old_connections()

        with ThreadPoolExecutor(max_workers=2) as executor:
            results = list(executor.map(attempt, browsers))
        self.assertEqual(sorted(results), [200, 403])
