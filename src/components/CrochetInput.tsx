import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputProps } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";

type Row = {
  row: string;
  value: string;
};

interface CrochetInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const CrochetInput = (props: CrochetInputProps) => {
  const [rows, setRows] = useState<Row[]>([{ row: "R1", value: "" }]);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  useEffect(() => {
    const value = props.value;
    const stepRows: Row[] = [];

    if (Array.isArray(value)) {
      value.forEach((item: string) => {
        const itemSplit = item.split(": ");
        const row = itemSplit[0];
        const value = itemSplit[1];
        if (row && value) {
          stepRows.push({ row: row, value: value });
        }
      });

      setRows(stepRows);
    }
  }, []);

  const onChange = (newRows: Row[]) => {
    if (newRows) {
      setRows(newRows);
      const newSteps: string[] = [];
      newRows.forEach((r) => newSteps.push(`${r.row}: ${r.value}`));
      setTimeout(() => {
        props.onChange?.(newSteps);
      }, 500);
    }
  };

  const getNextRowLabel = (currentLabel: string) => {
    const matchRange = currentLabel.match(/^R(\d+)-?(\d+)$/);
    const matchSingle = currentLabel.match(/^R(\d+)$/);

    if (matchRange) {
      const end = parseInt(matchRange[2], 10);
      return `R${end + 1}`;
    }

    if (matchSingle) {
      const current = parseInt(matchSingle[1], 10);
      return `R${current + 1}`;
    }

    return "R?";
  };

  const regenerateRowLabels = (startIndex: number, newRows: Row[]) => {
    const updatedRows = [...newRows];
    let startNumber = 1;

    if (startIndex > 0) {
      const match = updatedRows[startIndex - 1].row.match(/^R(\d+)$/);
      const matchRange =
        updatedRows[startIndex - 1].row.match(/^R(\d+)-(\d+)$/);
      if (match) {
        startNumber = parseInt(match[1], 10) + 1;
      } else if (matchRange) {
        startNumber = parseInt(matchRange[2], 10) + 1;
      }
    }

    for (let i = startIndex; i < updatedRows.length; i++) {
      const matchRange = updatedRows[i].row.match(/^R(\d+)-(\d+)$/);
      const matchSingle = updatedRows[i].row.match(/^R(\d+)$/);
      if (matchRange) {
        const start = parseInt(matchRange[1], 10);
        const end = parseInt(matchRange[2], 10);
        const newStart = startNumber;
        const newEnd = newStart + (end - start);
        updatedRows[i].row = `R${newStart}-${newEnd}`;
        startNumber = newEnd + 1;
      }
      if (matchSingle) {
        updatedRows[i].row = `R${startNumber++}`;
      }
    }
    return updatedRows;
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const nextLabel = getNextRowLabel(rows[index].row);
      const newRows = [...rows];
      newRows.splice(index + 1, 0, { row: nextLabel, value: "" });
      const updatedRows = regenerateRowLabels(index + 1, newRows);

      onChange(updatedRows);

      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const updateRow = (index: number, key: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index][key] = value;

    onChange(newRows);
  };

  const deleteRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    const updatedRows = regenerateRowLabels(index - 1, newRows);

    onChange(updatedRows);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index} style={{ display: "flex", marginBottom: 8 }}>
          <Input
            style={{ width: 80, marginRight: 8 }}
            value={row.row}
            onChange={(e) => updateRow(index, "row", e.target.value)}
          />
          <Input
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            value={row.value}
            onChange={(e) => updateRow(index, "value", e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            placeholder="輸入圖解內容，例如 5x"
          />
          <MinusCircleOutlined
            style={{ marginLeft: 8, color: "red", cursor: "pointer" }}
            onClick={() => deleteRow(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default CrochetInput;
