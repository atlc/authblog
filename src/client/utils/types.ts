export type IBlogs = {
    id: string;
    title: string;
    content: string;
    authorid: string;
    created_at: string;
    updated_at: string;
    AuthorName?: string; // If coming from the BlogAuthors stored procedure
    AuthorEmail?: string; // If coming from the BlogAuthors stored procedure
}

export type IBlogTags = {
    blogid: string;
    tagid: string;
    name: string;
}

export type IAuthors = {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export type ITags = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}