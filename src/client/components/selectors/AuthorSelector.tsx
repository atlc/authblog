import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IUsers } from '../../utils/types';
import { api } from '../../utils/api-service';


const AuthorSelector = (props: AuthorSelectorProps) => {
    const { onSelectChange } = props; // Allows us to propagate the state of current selected authors up to parent functions/components
    const [fullAuthorsList, updateAuthors] = useState<IUsers[]>(null); // Sets state to a retrieval of all author info in the Authors table
    const [selectedAuthor, updateSelectedAuthor] = useState(null); // Sets state to the currently selected author

    useEffect(() => {
        (async () => {
            const res = await api('/api/users');
            let authors: IUsers[] = await res.json();
            console.log(authors)
            let allAuthors: any = [];
            // We just need their id as 'value' for tying into the blog, and their name as 'label' to display in the selector 
            authors.map(a => allAuthors.push({ value: `${a.id}`, label: `${a.firstname} ${a.lastname}` }));
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