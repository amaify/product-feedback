import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../type";

type FormInputsType = {
	userInputValue: string;
	category: string;
	updateStatus: string;
	userDescriptionValue?: string;
};

function useInput(validateValue: (value: string) => boolean) {
	const editState = useSelector(
		(state: RootState) => state.productFeedbackReducer.edit
	);
	const editContent = useSelector(
		(state: RootState) => state.productFeedbackReducer.editContent
	);

	const [enteredValue, setEnteredValue] = useState<FormInputsType>({
		userInputValue: "",
		category: "",
		updateStatus: "",
	});

	const [editEnteredValue, setEditEnteredValue] = useState<FormInputsType>({
		userInputValue: !editState ? "" : editContent.title,
		userDescriptionValue: editState ? editContent.description : "",
		category: "",
		updateStatus: "",
	});

	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [maxCharacters, setMaxCharacter] = useState<number>(250);
	const [charactersLeft, setCharactersLeft] = useState<number>(250);

	const [activeClick, setActiveClick] = useState(!editState ? 0 : NaN);
	const [editActiveClick, setEditActiveClick] = useState(NaN);
	const [activeText, setActiveText] = useState(
		!editState ? "Feature" : editContent.category
	);
	const [activeTextEdit, setActiveTextEdit] = useState(
		!editState ? "Suggestion" : editContent.status
	);

	const valueIsValid = validateValue(
		!editState ? enteredValue.userInputValue : editEnteredValue.userInputValue
	);
	const hasError = !valueIsValid && isTouched;

	const inputChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const userInput = event.target.value;

		!editState
			? setEnteredValue({
					...enteredValue,
					userInputValue: userInput,
			  })
			: setEditEnteredValue({
					...editEnteredValue,
					userInputValue: userInput,
					userDescriptionValue: userInput,
			  });
	};

	const commentChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const char = event.target.value;

		const charCount = char.length;
		const maxChar = maxCharacters;

		const charLength = maxChar - charCount;

		setCharactersLeft(charLength);

		setEnteredValue({ ...enteredValue, userInputValue: char });
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const onSelectItemHandler = (item: { id: number; text: string }) => {
		setActiveClick(item.id);
		setActiveText(item.text);

		setEnteredValue({ ...enteredValue, category: item.text });
	};

	const editSelectItemHandler = (item: { id: number; text: string }) => {
		setEditActiveClick(item.id);
		setActiveTextEdit(item.text);

		setEnteredValue({ ...enteredValue, updateStatus: item.text });
	};

	const resetUserInput = () => {
		setEnteredValue({
			...enteredValue,
			userInputValue: "",
		});
		setActiveText("Feature");
		setActiveTextEdit("Suggestion");
		setIsTouched(false);
		setCharactersLeft(250);
	};

	return {
		value: enteredValue.userInputValue,
		editValue: editEnteredValue.userInputValue,
		editDescription: editEnteredValue.userDescriptionValue,
		category: enteredValue.category,
		updateStatus: enteredValue.updateStatus,
		touched: isTouched,
		activeClick,
		editActiveClick,
		activeText,
		activeTextEdit,
		inputChangeHandler,
		commentChangeHandler,
		inputBlurHandler,
		resetUserInput,
		onSelectItemHandler,
		editSelectItemHandler,
		hasError: hasError,
		isValueValid: valueIsValid,
		charactersLeft,
	};
}

export default useInput;
