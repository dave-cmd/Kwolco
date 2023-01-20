import  { DataSource } from "typeorm"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";



@Entity()
class Product {
    @PrimaryGeneratedColumn()
    index: number
    @Column({
        length: 300,
    })

    Price: string
    @Column({
        length: 300,
    })

    Country: string
    @Column({
        length: 300,
    })
    
    Date: string
    @Column({
        length: 300,
    })
    Name: string
    @Column({ length: 100 })
    Qty: string;
      

}

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Product],
    subscribers: [],
    migrations: [],
})


AppDataSource.initialize()
.then(()=>console.log("Database connection to postgres db success ...")
)
.catch(error=>console.log(`A database connection error occured...${error}`))



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Product {
    index: Int
    Price: String
    Country: String
    Date: String
    Name: String
    Qty: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    products: [Product]
    product(Country: String!): [Product]
  }
`;



const resolvers = {
    Query: {
      products: async() => await AppDataSource.manager.find(Product),
      product: async(_:any, args: any)=> await AppDataSource.manager.find(Product,{where:{ Country: args.Country}})
    },
  };

const server =  new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})


console.log("server is runnning on " + url)