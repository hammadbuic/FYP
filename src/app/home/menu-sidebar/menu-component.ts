export class MenuItem {
    constructor(
        public name: string,
        public route: string,
        public icon: string = ''
    ) {}
}
export const adminList = [
    new MenuItem('Dashboard','dashboard','nav-icon fas fa-tachometer-alt'),
    new MenuItem('Assign Coordinator', 'assign-coordinator','nav-icon fas fa-tachometer-alt'),
    new MenuItem('Add Users','manage-users' ,'nav-icon fas fa-tachometer-alt'),
    /*new MenuItem('Manage Groups', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Manage Activity',  'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Maintain NewsFeed',  'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View Progress', 'nav-icon fas fa-tachometer-alt'),*/
];
export const coordinatorList = [
    new MenuItem('Manage Groups','manage-groups', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Manage Activity','manage-activity', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Maintain NewsFeed','maintain-newsfeed', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View Progress','view-progress', 'nav-icon fas fa-tachometer-alt'),
];
export const studentList = [
    new MenuItem('View Project Activity','view-project-activity', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View NewsFeed','view-newsfeed', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Submit Documents','submit-docs', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Goto Git','goto-git', 'nav-icon fas fa-tachometer-alt')
];
export const supervisorList = [
    new MenuItem('View Group','view-group','nav-icon fas fa-tachometer-alt'),
    new MenuItem('See Documents','see-docs', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Go to Git lab','goto-gitlab',  'nav-icon fas fa-tachometer-alt'),
];