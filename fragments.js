export const COMMENT_FRAGEMNET = `
fragment CommentParts on Comment{
    id
    text
    user{
        name
    }    
}
`;
