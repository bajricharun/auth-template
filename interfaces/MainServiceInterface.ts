import { PrismaClient } from "@prisma/client";

export default interface IMainService {
    prisma: PrismaClient;
}
