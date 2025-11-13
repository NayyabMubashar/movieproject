import React from 'react'
import {Card,CardContent,Skeleton} from '@mui/material'

const LoadingSkeleton = ({count=6}) => {
  return (
    <>
    {Array.from({length:count}).map((_, index)=>(
    <Card key={index}>
        <Skeleton variant='rectangular' height={30}/>

        <CardContent>
            <Skeleton variant='text' width='80%'/>
            <Skeleton variant='text' width='80%'/>
        </CardContent>

    </Card>



    ))}
    
    
    </>
  )
}

export default LoadingSkeleton

