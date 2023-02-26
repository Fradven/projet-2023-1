<?php
class CartItem
{
    public $id;
    public $qtty;

    function set_id($id) {
        $this->id = $id;
    }

    function set_qtty($qtty) {
        $this->qtty = $qtty;
    }

    function get_id($id) {
        return $this->id;
    }

    function get_qtty($qtty) {
        return $this->qtty;
    }
}