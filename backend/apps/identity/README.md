# Identidade

User UUID com papel do produto CLIENT/LAWYER/ADMIN, tokens de ação com hash, MFA criptografado, códigos de recuperação de uso único, rate limits persistidos, auditoria e fila durável de e-mails.

Serviços e views implementam os fluxos de acesso com CSRF, validação estrita de campos e sessão vinculada ao portal. Convites criam somente LAWYER; bootstrap_admin cria o primeiro ADMIN por operação local e exige MFA no login. Papéis do produto não são concedidos por is_staff/is_superuser.

[Operação e testes](../../../docs/ACESSO.md). Gestão jurídica e autorização por caso continuam pendentes.
