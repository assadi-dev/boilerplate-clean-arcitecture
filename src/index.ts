
// Enable decorators
import 'reflect-metadata'

// Enable env config
import 'dotenv/config'; 

// Start API
import './infrastructure/app';

//Injection dependances 
import './infrastructure/adapters/adapter.injection'