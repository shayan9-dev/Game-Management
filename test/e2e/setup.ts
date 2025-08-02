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

// describe('Login Function', () => {

//   it('should return success for correct credentials', () => {
//     const result = login("admin", "1234");
//     expect(result).toBe("Login successful");
//   });

//   it('should return failure for incorrect username', () => {
//     const result = login("user", "1234");
//     expect(result).toBe("Login failed");
//   });

//   it('should return failure for incorrect password', () => {
//     const result = login("admin", "wrong");
//     expect(result).toBe("Login failed");
//   });

//   it('should return failure for both wrong username and password', () => {
//     const result = login("user", "wrong");
//     expect(result).toBe("Login failed");
//   });

// });