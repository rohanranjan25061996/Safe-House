import React from "react";
import {useMoralis} from "react-moralis"
import {AuthContext} from "../../contextAPI/Auth"

const init = {
    safeName: '',
    owners: [
        {
            name: '',
            address: ''
        }
    ],
    limit: ''
}

const temp = {
    name: '',
    address: ''
}

const CreateNewSafe = (props) => {

    const {userAddress}  = React.useContext(AuthContext)
    const [form, setForm] = React.useState(init)
    const {addNewSafe, addBrandNewSafe} = props

    React.useEffect(() => {
        const {owners} = form
        let ok = owners.map((item) => Object.assign({}, {...item, address: userAddress}))
        setForm({...form, owners: ok})
    }, [])

    const addOwnersForm = () => {
        const {owners} = form
        let ok = [...owners, temp]
        setForm({...form, owners: ok})
    }

    const handelDelete = (index) => {
        const {owners} = form
        const newOwners = owners.filter((_, i) => i !== index)
        setForm({...form, owners: newOwners})
    }

    const handelChange = (e) => {
        const {name, value} = e.target;
        if(name.includes('owners')){
            let temp = name.split('.');
            let rightNowI = Number(temp[1]);
            let rightNowN = temp[2];
            const {owners}  = form
            let ok = owners.map((item, i) => {
                if(i === rightNowI){
                    if ('name' == rightNowN) {
                        return Object.assign({}, { ...item, name: value });
                    } else if ('address' == rightNowN) {
                        return Object.assign({}, { ...item, address: value });
                    }
                }else{
                    return item
                }
            })
            setForm({...form, owners: ok})
        }else{
            setForm({...form, [name]: value})
        }
    }

    const handelSubmit = () => {
        console.log("form data is => ", form)
        addNewSafe(form)
        // addBrandNewSafe(form)
    }

    return(
        <>
        <div>
            <input placeholder="safe Name" name="safeName" value={form.safeName} onChange={handelChange} />
            <input placeholder="limit" name="limit" value={form.limit} onChange={handelChange} />
            {form.owners.map((item, index) => <div>
                <input name={`owners.${index}.name`} value = {item.name} onChange={handelChange} />
                <input name={`owners.${index}.address`} value = {item.address} onChange={handelChange} />
                {index !== 0 && <button onClick={() => handelDelete(index)}>delete</button>}
            </div>)}
            <div>
                <button onClick={addOwnersForm}>add owners</button>
                <button onClick={handelSubmit}>submit</button>
            </div>
        </div>
        </>
    )
}

export default CreateNewSafe