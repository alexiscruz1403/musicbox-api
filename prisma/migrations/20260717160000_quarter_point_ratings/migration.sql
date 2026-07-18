-- Fase 3 (docs/fase-3-features.md): ratings ahora aceptan cuartos de punto
-- (1, 1.25, 1.5, ..., 10), no solo enteros. Widening seguro — todo valor
-- entero o de 1 decimal existente cabe sin pérdida en DECIMAL(4,2).

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" TYPE DECIMAL(4,2) USING "rating"::DECIMAL(4,2);

-- AlterTable (Int -> Decimal)
ALTER TABLE "track_review_items" ALTER COLUMN "rating" TYPE DECIMAL(4,2) USING "rating"::DECIMAL(4,2);
