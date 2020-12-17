import React from 'react';
import { CoursePart } from '../type';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return <p>{part.name},{part.exerciseCount},{part.description}</p>;
        case 'Using props to pass data':
            return <p>{part.name},{part.exerciseCount}, {part.groupProjectCount}</p>;
        case 'Deeper type usage':
            return <p>{part.name},{part.exerciseCount},{part.description},{part.exerciseSubmissionLink}</p>;
        default: 
        assertNever(part)
        return null;
    }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default Part;