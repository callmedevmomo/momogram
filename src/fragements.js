export const USER_FRAGMENT = `

    id
    name


`;
export const COMMENT_FRGMENT = `

    id
    text
    user{
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `

    id
    url
`;

export const FULL_POST_FRAGMENT = `
fragment PostParts on Post{
    id
    location
    caption
    
    files{
        ${FILE_FRAGMENT}
    }
    comments{
        ${COMMENT_FRGMENT}
    }
    user{
        ${USER_FRAGMENT}
    }
}`;

export const ROOM_FRAGMENT = `fragment Roomparts on Room{
    id
 participants{
     id
 }
}`;
