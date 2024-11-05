import classes from "./classes.module.scss";


const Resetting = () => {

    return(
        <>
            <button type="reset" className={classes.reset_btn}>
                Отменить заполнение
            </button>
        </>
    )
}

export default Resetting;
