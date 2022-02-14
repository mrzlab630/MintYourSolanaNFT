import {Iprisma} from "./utils/prisma"


declare global {
    namespace NodeJS {
        interface Global {
            prisma: undefined|Iprisma;
        }
    }
}