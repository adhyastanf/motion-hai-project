import { Hono } from "hono";
import { createOrganization } from "../controllers/organizations";

export const orgRoutes = new Hono();

orgRoutes.post('/', createOrganization)