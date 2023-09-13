import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "../../reducers/counterSlice";

const counter = useSelector((state) => state.counter.value);
const dispatch = useDispatch();

<div>
<h2> The counter is at: {counter}</h2>
<button onClick={() => dispatch(increment(incrementByAmount(2)))}>increase</button>
<button onClick={() => dispatch(decrement())}>decrease</button>
</div>