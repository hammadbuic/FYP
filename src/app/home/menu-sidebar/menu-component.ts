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
/*export const coordinatorList = [
    new MenuItem('Manage Groups', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Manage Activity', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Maintain NewsFeed', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View Progress', 'nav-icon fas fa-tachometer-alt'),
];
export const studentList = [
    new MenuItem('View Project Activity', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('View NewsFeed', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Submit Documents', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Goto Git', 'nav-icon fas fa-tachometer-alt')
];
export const supervisorList = [
    new MenuItem('View Group', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('See Documents', 'nav-icon fas fa-tachometer-alt'),
    new MenuItem('Go to Git lab', 'nav-icon fas fa-tachometer-alt'),
];*/