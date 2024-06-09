# boilerplate-cleanarchi

## Quick start

As the project uses npm 

Install dependencies
```sh
npm install
```



You can run the project locally with:

```sh
 npm run dev
```
**Api Doc** => [http://localhost:8000](http://localhost:8000/api-doc)

## Database migrations

If you have made changes to database entities and need to generate a new
migration, you can do so by issuing the following command:


### Generate migration with npm 
```sh
npm run typeorm migration:generate -- --d "src\infrastructure\adapters\type-orm\data-source.ts"   "src\infrastructure\adapters\type-orm\migrations\migration-name"

```
Replace `migration-name` with the name of your migration.

### Create new migration
```sh
npm run typeorm migration:create  "src\infrastructure\adapters\type-orm\migrations\migration-name"

```
Replace `migration-name` with the name of your migration.

### Run Migration with npm
```sh
npm run typeorm migration:run  -- --d "src\infrastructure\adapters\type-orm\data-source.ts"

```


