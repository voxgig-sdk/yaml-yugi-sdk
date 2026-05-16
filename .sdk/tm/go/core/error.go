package core

type YamlYugiError struct {
	IsYamlYugiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYamlYugiError(code string, msg string, ctx *Context) *YamlYugiError {
	return &YamlYugiError{
		IsYamlYugiError: true,
		Sdk:              "YamlYugi",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YamlYugiError) Error() string {
	return e.Msg
}
