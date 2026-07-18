-- Fase 3 (docs/fase-3-features.md): la descripción nunca fue un requisito de
-- negocio para crear una reseña — solo una restricción de columna/DTO. Se
-- permite crear una reseña con únicamente puntuaciones (rating de track, o
-- trackItems por canción en un álbum), sin descripción.

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "description" DROP NOT NULL;
