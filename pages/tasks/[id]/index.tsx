import { useRouter } from "next/router";
import CustomButton from "../../../components/CustomButton";

const View = () => {
    const router = useRouter()
    const id = router.query.id
    return (
        <div>
            <CustomButton customFunction={() => router.back()}>Return</CustomButton>
            <p>You see task no. {id}</p>
        </div>
    )
}

export default View;