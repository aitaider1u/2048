import './GridItem.css'

export default function GridItem({value}){
    return (
        <div className={`grid-item tile-${value}`}>
            <span>
                {value}
            </span>
        </div>
    );
}