-- Fase 10 (Hardening): índice de lectura para las notificaciones no leídas por
-- usuario (repo NotificationsRepository.list — filtra por recipientId, readAt y
-- ordena por createdAt DESC). Es el índice documentado en musicbox.md §5
-- (idx_notif_recipient) que faltaba: la tabla `notifications` solo tenía su PK
-- y las FKs, sin índice secundario sobre recipientId.
--
-- schema.prisma se deja intencionalmente sin cambios, igual que
-- 20260701000000_review_constraints y 20260702000000_social_comments_index:
-- estos índices se manejan por SQL crudo, no vía @@index, para no introducir
-- drift con `prisma migrate dev`.

CREATE INDEX "idx_notif_recipient"
  ON "notifications" ("recipientId", "readAt", "createdAt" DESC);
