export const USER_FRAGMENT = `

    id
    name
    avatar


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

export const MESSAGE_FRAGMENT = `
id
text
to{
    ${USER_FRAGMENT}
}
from{
    ${USER_FRAGMENT}
}
`;
export const ROOM_FRAGMENT = `fragment Roomparts on Room{
    id
 participants{
     ${USER_FRAGMENT}
 }
 messages{
     ${MESSAGE_FRAGMENT}
 }
}`;
