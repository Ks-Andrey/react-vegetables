function AdminBtns({openBlock}) {
    return (
        <>
            <button onClick={() => openBlock('posts')} className="btn btn-primary">Поставщик</button>
            <button onClick={() => openBlock('tovars')} className="btn btn-primary">Товар</button>
            <button onClick={() => openBlock('changePass')} className="btn btn-primary">Изменить пароль</button>
        </>
    )
}

export default AdminBtns;