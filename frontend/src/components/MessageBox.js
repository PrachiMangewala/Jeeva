export default function MessageBox (props) {
    return (
        <div className={`alert alert-${props.variant || 'info'} my-2 mx-2`}>
            {props.children}
        </div>
    )
}