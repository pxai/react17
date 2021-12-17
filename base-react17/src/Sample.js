
const Fetch = ({children}) => children(data => <div>{data.length}</div>)

export default function Sample () {
    return (
        <>
         <h3>Sample</h3>
        </>
    )
}