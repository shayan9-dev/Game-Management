import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { promises } from "dns";
import { AppModule } from "src/app.module";

export async function createTestApp(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();  
    return app  
};