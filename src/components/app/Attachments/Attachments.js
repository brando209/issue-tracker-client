import React from 'react';

function Attachments(props) {
    const renderAttachmentItems = () => {
        const items = [];
        props.attachments && props.attachments.forEach((attachment, idx) => {
            items.push(
                <li key={`attachment-${idx}`}>
                    <span>{attachment.filename}</span>{" "}
                    <a href={attachment.data} download={attachment.filename}>{"Download"}</a>
                </li>
            )
        });
        return items;
    }

    return (
        <ul className="attachments-list">
            {
                renderAttachmentItems()
            }   
        </ul>
    );
}

export default Attachments;