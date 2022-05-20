import { useState } from "react";

type FormInputsType = {
	userInputValue: string;
	category: string;
	updateStatus: string;
};

function useInput(validateValue: (value: string) => boolean) {
	const [enteredValue, setEnteredValue] = useState<FormInputsType>({
		userInputValue: "",
		category: "",
		updateStatus: "",
	});

	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [maxCharacters, setMaxCharacter] = useState<number>(250);
	const [charactersLeft, setCharactersLeft] = useState<number>(250);

	const [activeClick, setActiveClick] = useState(0);
	const [activeText, setActiveText] = useState("Feature");
	const [activeTextEdit, setActiveTextEdit] = useState("Suggestion");

	const valueIsValid = validateValue(enteredValue.userInputValue);
	const hasError = !valueIsValid && isTouched;

	const inputChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const userInput = event.target.value;

		setEnteredValue({ ...enteredValue, userInputValue: userInput });
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
		setActiveClick(item.id);
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
		category: enteredValue.category,
		updateStatus: enteredValue.updateStatus,
		touched: isTouched,
		activeClick,
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
