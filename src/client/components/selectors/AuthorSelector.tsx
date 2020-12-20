import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IAuthors } from '../../utils/types';

const AuthorSelector = (props: AuthorSelectorProps) => {
    const { onSelectChange } = props; // Allows us to propagate the state of current selected authors up to parent functions/components
    const [fullAuthorsList, updateAuthors] = useState<IAuthors[]>(null); // Sets state to a retrieval of all author info in the Authors table
    const [selectedAuthor, updateSelectedAuthor] = useState(null); // Sets state to the currently selected author

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/authors');
            let authors: IAuthors[] = await res.json();
            let allAuthors: any = [];
            // We just need their id as 'value' for tying into the blog, and their name as 'label' to display in the selector 
            authors.map(a => allAuthors.push({ value: `${a.id}`, label: `${a.name}` }));
            updateAuthors(allAuthors);
            updateSelectedAuthor(allAuthors[0]); // Render the first author in the Authors table as the default value
        })()
    }, [])

    useEffect(() => {
        onSelectChange(selectedAuthor);
    }, [selectedAuthor])

    if (!fullAuthorsList) return <></> // Don't render the selector at all until the authors list is able to populate it
    
    // Updates state with the new selectedAuthor value, triggering the useEffect above to fire the onSelectChange to pass the new author up to the parent
    const updateSelected = (selectedOption: any) => updateSelectedAuthor(selectedOption);

    return (
        <>
            <Select
                defaultValue={fullAuthorsList[0]}
                name="tags"
                onChange={updateSelected}
                options={fullAuthorsList}
                className="basic-multi-select text-black"
                classNamePrefix="select"
            />
        </>
    )
};

interface AuthorSelectorProps { 
    onSelectChange(a: any): void;
}

export default AuthorSelector;