export default function Posts (props) {
    return (
        <div>
           { props.posts.map((post,i) => <div key={i}>{post.name}</div>) }
        </div>
    );
}