export class MenuItem {
    constructor(
        public name: string,
        public route: string,
        public icon: string = ''
    ) {}
}
export const adminList = [
    new MenuItem('Dashboard','dashboard','nav-icon fas fa-user-plus mr-3 fa-2x'),
    new MenuItem('Manage Students', 'manage-students','nav-icon fas fa-user-graduate mr-3 fa-2x'),
    new MenuItem('Manage Supervisor','manage-users' ,'nav-icon fas fa-user-cog mr-3 fa-2x'),
    /*new MenuItem('Manage Groups', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Manage Activity',  'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Maintain NewsFeed',  'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View Progress', 'nav-icon fas fa-tachometer-alt'),*/
];
export const coordinatorList = [
    new MenuItem('Manage Groups','manage-groups', 'nav-icon fas fa-users  mr-3 fa-2x'),
    new MenuItem('Manage Activity','manage-activity', 'nav-icon fas fa-tasks mr-3 fa-2x'),
    new MenuItem('Maintain NewsFeed','maintain-newsfeed', 'nav-icon far fa-newspaper mr-3 fa-2x'),
    new MenuItem('View Progress','view-progress', 'nav-icon fas fa-chart-line mr-3 fa-2x'),
    new MenuItem('View Group','view-group','nav-icon fas fa-users mr-3 fa-2x'),
    new MenuItem('See Documents','see-docs', 'nav-icon fas fa-file-alt mr-3 fa-2x'),
    new MenuItem('Go to Git lab','goto-gitlab',  'nav-icon fab fa-git-alt mr-3 fa-2x'),
];
export const studentList = [
    new MenuItem('  View Project Activity','view-project-activity', 'nav-icon fas fa-tasks mr-3 fa-2x'),
    new MenuItem('View NewsFeed','view-newsfeed', ' nav-icon far fa-newspaper mr-3 fa-2x'),
    new MenuItem('Submit Documents','submit-docs', 'nav-icon fas fa-file-upload mr-3 fa-2x'),
    new MenuItem('Goto Git','goto-git', 'nav-icon fab fa-git-alt mr-3 fa-2x')
];
export const supervisorList = [
    new MenuItem('View Group','view-group','nav-icon fas fa-users mr-3 fa-2x'),
    new MenuItem('See Documents','see-docs', 'nav-icon fas fa-file-alt mr-3 fa-2x'),
    new MenuItem('Go to Git lab','goto-gitlab',  'nav-icon fab fa-git-alt mr-3 fa-2x'),
];