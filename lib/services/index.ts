// here we create objects of services

import {AuthService} from "./AuthService";
import {api_urls} from "../settings";

export const authService = new AuthService(api_urls.local);
