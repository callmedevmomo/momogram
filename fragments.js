export const USER_FRAGMENT = `
    id
    name
    
`;
export const COMMENT_FRAGEMNET = `
    id
    text
    user{
        ${USER_FRAGMENT}
    }    

`;

export const FILE_FRAGEMNET = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
fragment PostParts on Post{
    id
    location
    caption
    files {
        ${FILE_FRAGEMNET}
    }
    comments{
        ${COMMENT_FRAGEMNET}
        }
    
    user{
        ${USER_FRAGMENT}
    }
}`;
