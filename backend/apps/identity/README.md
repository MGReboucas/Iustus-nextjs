# identity

Identidade, sessões, convites, papéis e MFA. Apenas o modelo estrutural de usuário e sua migração inicial existem; fluxos de autenticação e sessões por portal estão pendentes.

A base de identidade não libera acesso ao produto. Modelos, serviços, serializers, endpoints e testes devem ficar neste módulo à medida que cada tarefa for executada. Migrações pertencem ao Django; não criar tabelas pelo frontend.
