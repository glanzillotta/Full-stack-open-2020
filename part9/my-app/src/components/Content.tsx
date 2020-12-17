import React from 'react';
import {CoursePart} from '../type';
import Part from './Part'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({courseParts}) => {
    return (
    <div>
        {courseParts.map((course) => <Part key={course.name} part={course} />) }
    </div>)
}

export default Content