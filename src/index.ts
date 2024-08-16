import inquirer from "inquirer";
import { QueryResult } from "pg";
import { pool, connectToDB } from "./connection";