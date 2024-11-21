import GridItem from '../GridItem/GridItem'
import './Grid.css'

export default function Grid(){
    return(
        <div class="grid-container">
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem value={2}></GridItem>
            <GridItem></GridItem>
            <GridItem value={4}></GridItem>
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem value={8}></GridItem>
            <GridItem></GridItem>
            <GridItem value={2048}></GridItem>
            <GridItem></GridItem>
            <GridItem></GridItem>
            <GridItem value={256}></GridItem>
            <GridItem value={512}></GridItem>
            <GridItem value={1024}></GridItem>
        </div>
    )

}