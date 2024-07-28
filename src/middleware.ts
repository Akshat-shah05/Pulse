export {default} from 'next-auth/middleware'

// Add all protected routes over here
export const config = {matcher: ['/dashboard', '/dashboard/exercises/pushups']}