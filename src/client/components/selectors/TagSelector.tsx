import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { IBlogTags } from '../../utils/types';
import { ITags } from '../../utils/types';


const TagSelector = (props: TagSelectorProps) => {
    const { id, disabled, onSelectChange } = props; // onSelectChange() allows us to propagate the state of current selected authors up to parent functions/components
    const [allTags, getAllTags] = useState<IBlogTags[]>(null); // All tags available in the Tags table
    const [myTags, updateMyTags] = useState<IBlogTags[]>(); // Just the selected tags for a specific blog in Single or Edit views
    const [selectedTags, updateSelectedTags] = useState(allTags); // The selected tags (or all when unchanged) when creating a new blog


    useEffect(() => {
        (async () => {
            const res = await fetch('/api/tags');
            let tags: ITags[] = await res.json();
            let allOptions: any = [];
            tags.map(t => allOptions.push({ value: `${t.id}`, label: `${t.name}` }));
            getAllTags(allOptions);
            updateSelectedTags(allOptions); // Just a way to get the final useEffect to fire to pass the initial values of ALL tags up to the parent
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                // If no id is passed through props (IE creating a new blog), then check to see if allTags exists yet.
                if (id === undefined && allTags) { // If creating a new blog and all tags exist, send all the tags as 'my tags'
                    return updateMyTags(allTags);
                } else if (id === undefined) { // Else if while creating a new blog allTags does NOT exist yet, short circuit the return until it does 
                    return;
                }                               // Else continue on
                const res = await fetch(`/api/blogtags/${id}`);
                let tags = await res.json();
                let parsedTags: ITags[] = tags[0]; // Coming from a stored procedure so parsing out just what I want
                let myOptions: any = [];
                parsedTags.map(tag => myOptions.push({ value: `${tag.id}`, label: `${tag.name}` })); // Only placing the values I need in the selector
                if (id === undefined && allTags) {
                    updateMyTags(allTags);
                }
                updateMyTags(myOptions);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [allTags]);

    useEffect(() => {
        onSelectChange(selectedTags);
    }, [selectedTags])

    // Updates state with the currently selected tags, triggering the useEffect above to fire the onSelectChange to pass the newest tag array up to the parent
    const updateSelected = (selectedOptions: any) => updateSelectedTags(selectedOptions);

    if (!myTags) return <></>

    return (
        <>
            <Select
                defaultValue={[...myTags]}
                isMulti
                isDisabled={disabled}
                name="tags"
                options={allTags}
                onChange={updateSelected}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </>
    )
};

interface TagSelectorProps {
    id?: string;
    disabled: boolean;
    onSelectChange(a: any): void;
}

export default TagSelector;