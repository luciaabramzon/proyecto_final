import { useEffect, useState } from "react"
import { getCartById,deleteCartProductById, comprar, deleteCartById} from "../../api/services"
import { Header, Table, Button, Icon } from 'semantic-ui-react'

const ShowCarts = ()=>{
    const [carts,setCarts]=useState('')
    const id=localStorage.getItem('carritoId')
    const user=JSON.parse(localStorage.getItem('login'))
   const username=user.username

    const getCart= async()=>{
        const res=await getCartById(id)
        setCarts(res)
    }

    const deleteProd=async(e,id_producto)=>{
            const res=await deleteCartProductById(id,id_producto)
            console.log(res)
        setCarts(res)
    }

    const buy=async()=>{
        const res= await comprar(id,username)
        const resDelete=await deleteCartById(id)
        alert('Gracias por su compra')
        window.location.href='/home'
    }

    useEffect(()=>{
        getCart()
    },[])

    if(carts===''){
        return(
            <>
            <h1>Loading cart</h1>
            </>
        )
    }else{
        return(
            <>
            
            <Header as='h1' color='teal'>Carrito</Header>
            <Table celled padded>
            <Table.Header>
            <Table.Row>
            <Table.HeaderCell singleLine></Table.HeaderCell>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Definicion</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            
                {carts.productos.map((prod)=>(
                    <>
                    <Table.Row>
                    <Table.Cell key={prod.id}>
                        <Header as='h2'><img src={prod.image}/></Header>
                    </Table.Cell>
                    <Table.Cell singleLine>
                    {prod.titleProducto}
                    </Table.Cell>
                    <Table.Cell>
                        {prod.price}
                    </Table.Cell>
                    <Table.Cell>
                        {prod.description}
                    </Table.Cell>
                    <Table.Cell>
                        <Button  onClick={(e)=>{deleteProd(e,prod.id)}}>
                            Eliminar
                        </Button>
                    </Table.Cell>
                    </Table.Row>
                    </>
                ))}
             
             </Table.Body>
             </Table>
             <Button animated='fade'>
        <Button.Content visible>Comprar</Button.Content>
      <Button.Content hidden onClick={buy}>
        <Icon name='shop'/>
      </Button.Content>
    </Button>
                    </>

        )
    
    }
}




export default ShowCarts