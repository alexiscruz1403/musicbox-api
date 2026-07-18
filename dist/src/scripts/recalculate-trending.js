import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module.js';
import { TrendingService } from '../modules/trending/trending.service.js';
async function main() {
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: ['log', 'warn', 'error'],
    });
    try {
        const trending = app.get(TrendingService);
        const { albums, tracks } = await trending.recalculate();
        console.log(`Trending recalculado: ${albums.length} álbumes, ${tracks.length} tracks. ` +
            'Redis (trending:albums/trending:tracks) y TrendingSnapshot actualizados.');
    }
    finally {
        await app.close();
    }
}
main()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error('Error al recalcular trending:', err);
    process.exit(1);
});
//# sourceMappingURL=recalculate-trending.js.map