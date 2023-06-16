import moment from 'moment';

export const parseItems = (items) => {
    return items.map(item => ({
        ...item,
        date_published: moment(item.date_published).format('DD.MM.YYYY'),
        authors: item.authors.map(author => `${author.name} ${author.surname}`).join(', ') || '-',
    }));
};
