import { PrismaClient } from "@prisma/client"

const PrismaDB = new PrismaClient({
    // errorFormat: 'pretty',
    errorFormat:'minimal'
})


export default PrismaDB