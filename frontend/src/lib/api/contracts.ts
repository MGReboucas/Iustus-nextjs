/** Contrato do endpoint de liveness; não representa autenticação ou readiness. */
export type HealthResponse = {
  status: "ok";
};
