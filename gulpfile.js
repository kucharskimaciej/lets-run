switch (process.env.NODE_ENV) {
    case 'production':
        require('./.gulp/build-production');
        break;

    default:
        require('./.gulp/build-dev');
        require('./.gulp/watch');
        break;
}